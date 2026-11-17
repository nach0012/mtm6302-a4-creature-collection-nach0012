// PROVIDED: use this collection to generate the entries.
const $creatures = [
  {
    "name": "Moss Dragon",
    "description": "A gentle gardener who grows tiny forests wherever it naps.",
    "image": "assets/moss-dragon.svg",
    "alt": "A green dragon with leafy horns and small wings."
  },
  {
    "name": "Cloud Fox",
    "description": "A sky wanderer collecting soft clouds and lost daydreams.",
    "image": "assets/cloud-fox.svg",
    "alt": "A pale blue fox with pointed ears and a fluffy tail."
  },
  {
    "name": "Ember Salamander",
    "description": "A warm little companion that keeps campfires glowing.",
    "image": "assets/ember-salamander.svg",
    "alt": "An orange salamander with a flame at the end of its tail."
  },
  {
    "name": "Moon Owl",
    "description": "A quiet navigator who reads the stories written in stars.",
    "image": "assets/moon-owl.svg",
    "alt": "A purple owl with a crescent moon on its forehead."
  },
  {
    "name": "Crystal Turtle",
    "description": "A patient explorer carrying a sparkling crystal garden.",
    "image": "assets/crystal-turtle.svg",
    "alt": "A mint green turtle with purple crystals on its shell."
  },
  {
    "name": "Mushroom Sprite",
    "description": "A woodland storyteller with a spotted cap and muddy boots.",
    "image": "assets/mushroom-sprite.svg",
    "alt": "A small cream sprite wearing a red spotted mushroom cap."
  }
]

// YOUR WORK: build these features using the supplied HTML, CSS, and data.

// ---------------------------------------------------------------
// 1. SELECT THE COLLECTION AND PREFERENCE CONTROLS
// ---------------------------------------------------------------
// Get the collection list, both select controls, and the status message.
const $collection = document.querySelector('#collection')
const $themeSelect = document.querySelector('#theme')
const $layoutSelect = document.querySelector('#layout')
const $status = document.querySelector('#status')

// One assignment-specific key holds both preferences.
const STORAGE_KEY = 'mtm6302-a4-creature-preferences'


// ---------------------------------------------------------------
// 2. GENERATE THE CREATURE ENTRIES WITH A LOOP
// ---------------------------------------------------------------
// Start with an empty string
// For each creature in the array
//   Add an entry with its image, alt text, name and description
// Put all entries into the collection once
function renderCreatures () {
  let html = ''

  for (const creature of $creatures) {
    html += `
      <li class="creature">
        <img src="${creature.image}" alt="${creature.alt}">
        <div class="creature-info">
          <h3>${creature.name}</h3>
          <p class="creature-description">${creature.description}</p>
        </div>
      </li>
    `
  }

  // Replacing (not adding to) the content means entries are never duplicated.
  $collection.innerHTML = html
}


// ---------------------------------------------------------------
// 3. APPLY THE PREFERENCES TO THE PAGE
// ---------------------------------------------------------------
// Set the body's data-theme to the chosen theme
function applyTheme (theme) {
  document.body.dataset.theme = theme
}

// Set the collection's data-layout to the chosen layout
function applyLayout (layout) {
  $collection.dataset.layout = layout
}

// Show a short message to the visitor
function showMessage (text) {
  $status.textContent = text
}


// ---------------------------------------------------------------
// 4. SAVE BOTH PREFERENCES TO LOCAL STORAGE
// ---------------------------------------------------------------
// Put both current control values in one object
// Turn the object into a string and save it under the key
function savePreferences () {
  const preferences = {
    theme: $themeSelect.value,
    layout: $layoutSelect.value
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  showMessage('Your preferences have been saved.')
}

// When the theme changes: update the page, then save
function handleThemeChange () {
  applyTheme($themeSelect.value)
  savePreferences()
}

// When the layout changes: update the page, then save
function handleLayoutChange () {
  applyLayout($layoutSelect.value)
  savePreferences()
}


// ---------------------------------------------------------------
// 5. CHECK FOR SAVED DATA ON LOAD AND RESTORE IT
// ---------------------------------------------------------------
// Read the saved string
// If nothing is saved: keep the starting Forest/Cards look, show a message, don't save
// If something is saved: parse it, then restore the controls AND the appearance
function restorePreferences () {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (savedData === null) {
    showMessage('No saved preferences yet. Choose a habitat and layout.')
    return
  }

  // Optional extension: ignore saved data that isn't valid JSON
  let preferences
  try {
    preferences = JSON.parse(savedData)
  } catch (error) {
    showMessage('Saved preferences could not be read. Showing the default look.')
    return
  }

  // Restore the control values
  $themeSelect.value = preferences.theme
  $layoutSelect.value = preferences.layout

  // Restore the appearance from the controls
  applyTheme($themeSelect.value)
  applyLayout($layoutSelect.value)

  showMessage('Your saved preferences have been restored.')
}


// ---------------------------------------------------------------
// START THE PAGE
// ---------------------------------------------------------------
// Build the collection once, restore any saved choices, then listen for changes
renderCreatures()
restorePreferences()

$themeSelect.addEventListener('change', handleThemeChange)
$layoutSelect.addEventListener('change', handleLayoutChange)
