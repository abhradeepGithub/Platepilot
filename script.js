// Add this between existing script tags, or to your separate script.js file

// Save user data and show the meal planner
function saveUserData(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);

    // Calculate BMI
    const bmi = weight / (height * height);
    const bmiStatus = getBmiStatus(bmi);

    // Store user information for profile details
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-gender').textContent = gender;
    document.getElementById('profile-age').textContent = age;
    document.getElementById('profile-height').textContent = (height * 100).toFixed(0); // Convert back to cm
    document.getElementById('profile-weight').textContent = weight;
    document.getElementById('profile-bmi').textContent = bmi.toFixed(2);
    document.getElementById('profile-bmi-status').textContent = `(${bmiStatus})`;

    // Hide login section and show the meal planner
    document.querySelector('.login-section').style.display = 'none';
    document.getElementById('mealPlannerSection').style.display = 'block';

    // Display welcome message
    alert(`Welcome, ${name}! Let's plan your meals.`);
}

// Toggle profile details visibility
function toggleProfileDetails() {
    const profileDetails = document.getElementById('profile-details');
    if (profileDetails.style.display === 'none' || profileDetails.style.display === '') {
        profileDetails.style.display = 'block';
    } else {
        profileDetails.style.display = 'none';
    }
}

// Function to determine BMI status
function getBmiStatus(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 25) {
        return 'Normal';
    } else {
        return 'Overweight';
    }
}

// Updated meal data with nutrition information (calories, carbs, fat, protein, vitamins, sugar)
const mealData = {
    "Veg": {
        "Breakfast": [
            { meal: "Idli with sambar", calories: 250, carbs: 40, fat: 5, protein: 8, vitamins: 2, sugar: 4 },
            { meal: "Poha with veggies", calories: 300, carbs: 50, fat: 6, protein: 7, vitamins: 3, sugar: 2 },
            { meal: "Upma with coconut chutney", calories: 320, carbs: 45, fat: 8, protein: 6, vitamins: 3, sugar: 1 }
        ],
        "Lunch": [
            { meal: "Dal with roti and salad", calories: 450, carbs: 60, fat: 10, protein: 12, vitamins: 5, sugar: 4 },
            { meal: "Chole with rice", calories: 500, carbs: 65, fat: 12, protein: 10, vitamins: 6, sugar: 3 },
            { meal: "Vegetable biryani", calories: 520, carbs: 75, fat: 15, protein: 8, vitamins: 4, sugar: 2 }
        ],
        "Dinner": [
            { meal: "Palak paneer with roti", calories: 400, carbs: 55, fat: 12, protein: 14, vitamins: 8, sugar: 4 },
            { meal: "Aloo gobi with rice", calories: 450, carbs: 65, fat: 10, protein: 8, vitamins: 5, sugar: 3 },
            { meal: "Mixed vegetable curry", calories: 430, carbs: 50, fat: 9, protein: 9, vitamins: 6, sugar: 2 }
        ]
    },
    "Non-Veg": {
        "Breakfast": [
            { meal: "Egg bhurji with toast", calories: 350, carbs: 30, fat: 15, protein: 14, vitamins: 4, sugar: 3 },
            { meal: "Chicken sandwich", calories: 400, carbs: 45, fat: 18, protein: 18, vitamins: 5, sugar: 2 },
            { meal: "Omelette with vegetables", calories: 380, carbs: 25, fat: 12, protein: 16, vitamins: 4, sugar: 1 }
        ],
        "Lunch": [
            { meal: "Chicken curry with rice", calories: 600, carbs: 70, fat: 20, protein: 25, vitamins: 5, sugar: 3 },
            { meal: "Fish fry with roti", calories: 550, carbs: 50, fat: 22, protein: 20, vitamins: 4, sugar: 2 },
            { meal: "Egg curry with rice", calories: 520, carbs: 65, fat: 15, protein: 18, vitamins: 4, sugar: 3 }
        ],
        "Dinner": [
            { meal: "Grilled chicken with salad", calories: 450, carbs: 20, fat: 15, protein: 30, vitamins: 6, sugar: 1 },
            { meal: "Mutton curry with roti", calories: 620, carbs: 55, fat: 25, protein: 22, vitamins: 5, sugar: 4 },
            { meal: "Fish curry with rice", calories: 530, carbs: 60, fat: 18, protein: 20, vitamins: 6, sugar: 3 }
        ]
    },
    "Vegan": {
        "Breakfast": [
            { meal: "Vegan smoothie bowl", calories: 300, carbs: 50, fat: 8, protein: 6, vitamins: 10, sugar: 12 },
            { meal: "Oats with almond milk", calories: 350, carbs: 55, fat: 9, protein: 7, vitamins: 6, sugar: 5 },
            { meal: "Vegan toast with avocado", calories: 320, carbs: 40, fat: 10, protein: 5, vitamins: 4, sugar: 2 }
        ],
        "Lunch": [
            { meal: "Vegan Buddha bowl", calories: 500, carbs: 70, fat: 15, protein: 10, vitamins: 7, sugar: 3 },
            { meal: "Vegan lentil curry with rice", calories: 550, carbs: 80, fat: 12, protein: 14, vitamins: 8, sugar: 4 },
            { meal: "Vegan chickpea salad", calories: 480, carbs: 65, fat: 10, protein: 12, vitamins: 6, sugar: 3 }
        ],
        "Dinner": [
            { meal: "Vegan vegetable stir-fry", calories: 450, carbs: 60, fat: 10, protein: 10, vitamins: 8, sugar: 4 },
            { meal: "Vegan tofu curry", calories: 500, carbs: 75, fat: 12, protein: 15, vitamins: 7, sugar: 5 },
            { meal: "Vegan quinoa salad", calories: 430, carbs: 55, fat: 9, protein: 12, vitamins: 6, sugar: 3 }
        ]
    }
};

// Generate meal plan based on user preferences, including nutritional info
function generateMealPlan() {
    const preferences = document.getElementById('preferences').value;
    const mealPlanDiv = document.getElementById('meal-plan');
    const editableMealPlanDiv = document.getElementById('editable-meal-plan');
    let totalCalories = { "Breakfast": 0, "Lunch": 0, "Dinner": 0 };
    let totalNutrition = {
        "Breakfast": { carbs: 0, fat: 0, protein: 0, vitamins: 0, sugar: 0 },
        "Lunch": { carbs: 0, fat: 0, protein: 0, vitamins: 0, sugar: 0 },
        "Dinner": { carbs: 0, fat: 0, protein: 0, vitamins: 0, sugar: 0 }
    };

    if (!preferences || !mealData[preferences]) {
        alert('Please select a valid meal preference.');
        return;
    }

    mealPlanDiv.innerHTML = '';
    editableMealPlanDiv.innerHTML = '';

    // Loop through each meal type (Breakfast, Lunch, Dinner)
    ['Breakfast', 'Lunch', 'Dinner'].forEach(mealType => {
        const mealHeading = document.createElement('h4');
        mealHeading.textContent = `${mealType}:`;
        mealPlanDiv.appendChild(mealHeading);

        mealData[preferences][mealType].forEach((meal, index) => {
            const mealItem = document.createElement('p');
            mealItem.innerHTML = `${meal.meal} - ${meal.calories} kcal | Carbs: ${meal.carbs}g | Fat: ${meal.fat}g | Protein: ${meal.protein}g | Vitamins: ${meal.vitamins}mg | Sugar: ${meal.sugar}g`;
            mealPlanDiv.appendChild(mealItem);

            // Add to total nutrition
            totalCalories[mealType] += meal.calories;
            totalNutrition[mealType].carbs += meal.carbs;
            totalNutrition[mealType].fat += meal.fat;
            totalNutrition[mealType].protein += meal.protein;
            totalNutrition[mealType].vitamins += meal.vitamins;
            totalNutrition[mealType].sugar += meal.sugar;

            addMealToEditableSection(mealItem.innerHTML, index, mealType);
        });

        // Display total nutritional values for each meal type
        const totalNutritionItem = document.createElement('p');
        totalNutritionItem.innerHTML = `<strong>Total for ${mealType}: ${totalCalories[mealType]} kcal | Carbs: ${totalNutrition[mealType].carbs}g | Fat: ${totalNutrition[mealType].fat}g | Protein: ${totalNutrition[mealType].protein}g | Vitamins: ${totalNutrition[mealType].vitamins}mg | Sugar: ${totalNutrition[mealType].sugar}g</strong>`;
        mealPlanDiv.appendChild(totalNutritionItem);
    });
}

// Add custom meal
function addCustomMeal(event) {
    event.preventDefault();

    const mealType = document.getElementById('mealType').value;
    const mealName = document.getElementById('mealName').value;
    const mealCalories = parseInt(document.getElementById('mealCalories').value);
    const mealCarbs = parseInt(document.getElementById('mealCarbs').value);
    const mealFat = parseInt(document.getElementById('mealFat').value);
    const mealProtein = parseInt(document.getElementById('mealProtein').value);
    const mealVitamins = parseInt(document.getElementById('mealVitamins').value);
    const mealSugar = parseInt(document.getElementById('mealSugar').value);

    const newMeal = `${mealType}: ${mealName} - ${mealCalories} kcal | Carbs: ${mealCarbs}g | Fat: ${mealFat}g | Protein: ${mealProtein}g | Vitamins: ${mealVitamins}mg | Sugar: ${mealSugar}g`;

    // Display the new custom meal in the meal plan
    const mealPlanDiv = document.getElementById('meal-plan');
    const mealItem = document.createElement('p');
    mealItem.textContent = newMeal;
    mealPlanDiv.appendChild(mealItem);

    // Add the meal to the editable section
    addMealToEditableSection(newMeal);
}

// Function to add meals to the editable meal section
function addMealToEditableSection(meal, index, mealType) {
    const editableMealPlanDiv = document.getElementById('editable-meal-plan');

    const mealContainer = document.createElement('div');
    mealContainer.classList.add('editable-meal-item');
    
    const mealItem = document.createElement('p');
    mealItem.textContent = meal;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editMeal(mealItem, meal, index, mealType);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => mealContainer.remove();

    mealContainer.appendChild(mealItem);
    mealContainer.appendChild(editButton);
    mealContainer.appendChild(deleteButton);

    editableMealPlanDiv.appendChild(mealContainer);
}

// Function to edit an existing meal
function editMeal(mealElement, currentMeal, index, mealType) {
    const newMeal = prompt('Edit meal:', currentMeal);
    if (newMeal) {
        mealElement.textContent = newMeal;
    }
}