document.addEventListener('DOMContentLoaded', () => {
	// --- DOM ELEMENTS ---
	const clockEl = document.getElementById('clock');
	const currentDateEl = document.getElementById('current-date');
	const prevDayBtn = document.getElementById('prev-day-btn');
	const nextDayBtn = document.getElementById('next-day-btn');

	const checklist = document.getElementById('checklist');
	const checklistInput = document.getElementById('checklist-input');
	const addChecklistItemBtn = document.getElementById('add-checklist-item-btn');

	const notesTextarea = document.getElementById('notes-textarea');

	const weeklyCardInput = document.getElementById('weekly-card-input');
	const addWeeklyCardBtn = document.getElementById('add-weekly-card-btn');
	const dayColumns = document.querySelectorAll('.day-column');

	// --- STATE ---
	let current_date = new Date();
	let currentWeekId = null; // To track the current week, e.g., "2023-10-23"

	// --- CLOCK FUNCTION ---
	const updateClock = () => {
		if (!clockEl) return;
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');
		clockEl.textContent = `${hours}:${minutes}:${seconds}`;
	};

	// --- DATE & WEEK FUNCTIONS ---
	const getWeekId = (date) => {
		const d = new Date(date);
		// Adjust to Monday of the current week
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
		const monday = new Date(d.setDate(diff));
		return monday.toISOString().split('T')[0]; // YYYY-MM-DD of the week's Monday
	};

	const updateDateDisplay = () => {
		currentDateEl.textContent = current_date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		loadDataForDate(current_date);
	};

	const changeDay = (offset) => {
		saveDataForDate(current_date); // Save the data for the day we are leaving

		const oldWeekId = getWeekId(current_date);
		current_date.setDate(current_date.getDate() + offset);
		const newWeekId = getWeekId(current_date);

		if (oldWeekId !== newWeekId) {
			// Week has changed, load the new week's data
			loadWeeklyData(newWeekId);
		}

		updateDateDisplay();
	};

	// --- DATA PERSISTENCE (LOCAL STORAGE) ---
	const getFormattedDate = (date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

	// --- DAILY DATA ---
	const saveDataForDate = (date) => {
		const formattedDate = getFormattedDate(date);
		const data = {
			checklist: [],
			notes: notesTextarea.value,
		};

		// Save checklist items
		checklist.querySelectorAll('li').forEach(li => {
			// This is slightly brittle, but works for this implementation.
			// It assumes the delete button's text is a single character 'X'.
			data.checklist.push({
				text: li.textContent.slice(0, -1), // Remove 'X'
				completed: li.classList.contains('completed')
			});
		});

		localStorage.setItem(`planner-daily-${formattedDate}`, JSON.stringify(data));
	};

	const loadDataForDate = (date) => {
		const formattedDate = getFormattedDate(date);
		const data = JSON.parse(localStorage.getItem(`planner-daily-${formattedDate}`));

		// Clear current daily view
		checklist.innerHTML = '';
		notesTextarea.value = '';

		if (data) {
			// Load checklist
			if (data.checklist) {
				data.checklist.forEach(item => createChecklistItem(item.text, item.completed));
			}
			// Load notes
			notesTextarea.value = data.notes || '';
		}
	};

	// --- WEEKLY DATA ---
	const saveWeeklyData = () => {
		if (!currentWeekId) return;
		const weeklyData = {};
		dayColumns.forEach(col => {
			const day = col.dataset.day;
			weeklyData[day] = [];
			col.querySelectorAll('.task-card').forEach(card => {
				weeklyData[day].push(card.textContent);
			});
		});
		localStorage.setItem(`planner-weekly-${currentWeekId}`, JSON.stringify(weeklyData));
	};

	const loadWeeklyData = (weekId) => {
		currentWeekId = weekId;
		const data = JSON.parse(localStorage.getItem(`planner-weekly-${weekId}`));

		// Clear current weekly view
		dayColumns.forEach(col => {
			col.querySelectorAll('.task-card').forEach(card => card.remove());
		});

		if (data) {
			// Load weekly board
			Object.keys(data).forEach(day => {
				const column = document.querySelector(`.day-column[data-day="${day}"]`);
				if (column) {
					data[day].forEach(cardText => createWeeklyCard(cardText, column));
				}
			});
		}
	};

	// --- CHECKLIST FUNCTIONS ---
	const createChecklistItem = (text, completed = false) => {
		if (!text) return;
		const li = document.createElement('li');
		li.textContent = text;
		if (completed) {
			li.classList.add('completed');
		}

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'X';
		deleteBtn.className = 'delete-btn';
		li.appendChild(deleteBtn);

		// Toggle completed status
		li.addEventListener('click', (e) => {
			if (e.target !== deleteBtn) {
				li.classList.toggle('completed');
				saveDataForDate(current_date);
			}
		});

		// Delete item
		deleteBtn.addEventListener('click', () => {
			li.remove();
			saveDataForDate(current_date);
		});

		checklist.appendChild(li);
	};

	const handleAddChecklistItem = () => {
		createChecklistItem(checklistInput.value);
		checklistInput.value = '';
		saveDataForDate(current_date);
	};

	// --- WEEKLY BOARD FUNCTIONS ---
	const createWeeklyCard = (text, targetColumn) => {
		if (!text || !targetColumn) return;
		const card = document.createElement('div');
		card.className = 'task-card';
		card.textContent = text;
		card.draggable = true;

		// Drag and Drop events
		card.addEventListener('dragstart', () => {
			card.classList.add('dragging');
		});

		card.addEventListener('dragend', () => {
			card.classList.remove('dragging');
			saveWeeklyData(); // Use the dedicated weekly save function
		});

		targetColumn.appendChild(card);
	};

	const handleAddWeeklyCard = () => {
		const mondayColumn = document.querySelector('.day-column[data-day="Monday"]');
		createWeeklyCard(weeklyCardInput.value, mondayColumn);
		weeklyCardInput.value = '';
		saveWeeklyData(); // Use the dedicated weekly save function
	};

	// Drag and Drop for columns
	dayColumns.forEach(column => {
		column.addEventListener('dragover', e => {
			e.preventDefault();
			const draggingCard = document.querySelector('.dragging');
			if (draggingCard) {
				column.appendChild(draggingCard);
			}
		});
	});

	// --- EVENT LISTENERS ---
	prevDayBtn.addEventListener('click', () => changeDay(-1));
	nextDayBtn.addEventListener('click', () => changeDay(1));

	addChecklistItemBtn.addEventListener('click', handleAddChecklistItem);
	checklistInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') handleAddChecklistItem();
	});

	addWeeklyCardBtn.addEventListener('click', handleAddWeeklyCard);
	weeklyCardInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') handleAddWeeklyCard();
	});

	notesTextarea.addEventListener('blur', () => saveDataForDate(current_date)); // Save notes when user clicks away

	// --- INITIALIZATION ---
	updateClock();
	setInterval(updateClock, 1000);
	currentWeekId = getWeekId(current_date);
	updateDateDisplay(); // Loads daily data for today
	loadWeeklyData(currentWeekId); // Loads weekly data for this week
});
