document.addEventListener('DOMContentLoaded', () => {
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

    let current_date = new Date();
    let currentWeekId = null; 

    const getWeekId = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        const monday = new Date(d.setDate(diff));
        return monday.toISOString().split('T')[0]; 
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
        saveDataForDate(current_date); 

        const oldWeekId = getWeekId(current_date);
        current_date.setDate(current_date.getDate() + offset);
        const newWeekId = getWeekId(current_date);

        if (oldWeekId !== newWeekId) {
            loadWeeklyData(newWeekId);
        }

        updateDateDisplay();
    };
    const getFormattedDate = (date) => date.toISOString().split('T')[0]; 
    const saveDataForDate = (date) => {
        const formattedDate = getFormattedDate(date);
        const data = {
            checklist: [],
            notes: notesTextarea.value,
        };

        checklist.querySelectorAll('li').forEach(li => {
            data.checklist.push({
                text: li.textContent.slice(0, -1), 
                completed: li.classList.contains('completed')
            });
        });

        localStorage.setItem(`planner-daily-${formattedDate}`, JSON.stringify(data));
    };

    const loadDataForDate = (date) => {
        const formattedDate = getFormattedDate(date);
        const data = JSON.parse(localStorage.getItem(`planner-daily-${formattedDate}`));

        checklist.innerHTML = '';
        notesTextarea.value = '';

        if (data) {
            if (data.checklist) {
                data.checklist.forEach(item => createChecklistItem(item.text, item.completed));
            }
            notesTextarea.value = data.notes || '';
        }
    };

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

        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                li.classList.toggle('completed');
                saveDataForDate(current_date);
            }
        });

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

    const createWeeklyCard = (text, targetColumn) => {
        if (!text || !targetColumn) return;
        const card = document.createElement('div');
        card.className = 'task-card';
        card.textContent = text;
        card.draggable = true;


        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            saveWeeklyData(); 
        });

        targetColumn.appendChild(card);
    };

    const handleAddWeeklyCard = () => {
        const mondayColumn = document.querySelector('.day-column[data-day="Monday"]');
        createWeeklyCard(weeklyCardInput.value, mondayColumn);
        weeklyCardInput.value = '';
        saveWeeklyData(); 
    };

    dayColumns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            if (draggingCard) {
                column.appendChild(draggingCard);
            }
        });
    });

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

    notesTextarea.addEventListener('blur', () => saveDataForDate(current_date)); 

    currentWeekId = getWeekId(current_date);
    updateDateDisplay(); 
    loadWeeklyData(currentWeekId); 

});
