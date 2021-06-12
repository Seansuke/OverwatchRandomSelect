var OFFENSE_TYPE = 0;
var DEFENSE_TYPE = 1;
var TANK_TYPE = 2;
var SUPPORT_TYPE = 3;
var TOTAL_TYPES = 4;
var DAYS_USED = 6;
var STARTING_ROW = 2;
var STARTING_COLUMN = 2;
var OFFENSE_LIST = 
[ 
  "Genji"
  , "McCree"
  , "Pharah"
  , "Reaper"
  , "Soldier: 76"
  , "Tracer"
];
var DEFENSE_LIST = 
[
  "Bastion"
  , "Hanzo"
  , "Junkrat"
  , "Mei"
  , "Torbjörn"
  , "Widowmaker"
];
var TANK_LIST = 
[
  "D. Va"
  , "Reinhardt"
  , "Roadhog"
  , "Winston"
  , "Zarya"
];
var SUPPORT_LIST = 
[
  "Ana"
  , "Lúcio"
  , "Mercy"
  , "Symmetra"
  , "Zenyatta"
];
var CHARACTER_LIST = 
[
  OFFENSE_LIST
  , DEFENSE_LIST
  , TANK_LIST
  , SUPPORT_LIST
];

function execute()
{
  var characterMatrix = new Array(TOTAL_TYPES);
  var dayMatrix = new Array(DAYS_USED);
  for(var currentType = 0; currentType < TOTAL_TYPES; currentType++)
  {
    characterMatrix[currentType] = getCharacterList(currentType);
    dayMatrix[currentType] = new Array(DAYS_USED);
    for(var currentDay = 0; currentDay < DAYS_USED; currentDay++)
    { 
      var randomIndex = getRandomIndexFromList(characterMatrix[currentType]);
      var character = getCharacterFromList(characterMatrix[currentType], randomIndex);
      characterMatrix[currentType] = getListWithIndexRemoved(characterMatrix[currentType], randomIndex);
      dayMatrix[currentType][currentDay] = character;
    }
  }
  setSpreadsheet(dayMatrix, STARTING_ROW, STARTING_COLUMN);
}

function setSpreadsheet(matrix, startingRow, startingColumn)
{
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  for (var currentType = 0; currentType < TOTAL_TYPES; currentType++) 
  {
    for (var currentDay = 0; currentDay < DAYS_USED; currentDay++) 
    {
      var value = matrix[currentType][currentDay];
      var column = startingColumn + currentType;
      var row = startingRow + currentDay;
      range.getCell(row, column).setValue(value);
    }
  }
}

function getRandomIndexFromList(characterList)
{
  var randomDecimal = Math.random();
  var lengthOfList = characterList.length;
  var indexChosen = Math.floor(randomDecimal * (lengthOfList));
  return indexChosen;
}

function getCharacterFromList(characterList, index)
{
  if(characterList.length == 0)
  {
    return "";
  }
  if(index < 0)
  {
    return "";
  }
  if(index >= characterList.length)
  {
    return "";
  }
  return characterList[index];
}

function getListWithIndexRemoved(characterList, indexToRemove)
{
  if(characterList.length < 2)
  {
    return [];
  }
  var newCharacterList = new Array(characterList.length - 1);
  var subindex = 0;
  for(var index = 0; index < characterList.length; index++)
  {
    if(index != indexToRemove)
    {
      newCharacterList[subindex] = characterList[index];
      subindex++;
    }
  } 
  return newCharacterList;
}

function getCharacterList(type) 
{
  return CHARACTER_LIST[type];
}
