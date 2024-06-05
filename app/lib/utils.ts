import { v4 as uuidv4 } from 'uuid';
import { InstructionsTable } from './definitions';


export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function amountUpperBoundary(n: number, modifier: number): string {
  if (n == undefined || n == 0) {
    return "";
  } else return "- " + numberToFractionString(n * modifier) + "";
}
const acceptableDenominators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const maxDistanceToNumerator = 0.0001;

export function numberToFractionString(n: number): string {
  if (n == undefined) {
    return "";
  }
  if (n == 0) {
    return ""
  }
  const negative = (n < 0);
  if (negative) n = -n;

  const wholePart = Math.floor(n);
  n -= wholePart;
  const denom = acceptableDenominators.find(d =>
    Math.abs(d * n - Math.round(d * n)) <= maxDistanceToNumerator
  );

  if (typeof denom === 'undefined') {
    return (Math.round(n * 100) / 100) + wholePart + " ";
  }
  const numer = Math.round(denom * n);


  if (denom === 1) {

    return "" + (wholePart + numer) * (negative ? -1 : 1) + " ";
  }

  return (negative ? "-" : "") +
    (wholePart ? wholePart + " " : "") +
    numer + "/" + denom + " ";

}

export function spaceIfExists(s: string): string {
  if (s == "") {
    return ""
  } else {
    return s + " "
  }
}


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function getInstructionSet(id: string, list_reference: string, formData: FormData): 
[InstructionsTable[], InstructionsTable[], InstructionsTable[], string, string] {
  let deleteSets = []
  let createSets = []
  let updateSets = []
  let name = ""
  console.log(formData)
  const contextPattern = new RegExp(/context-(\d+)-(.*)/);
  const deletePattern = new RegExp(/deleted-(\d+)/)
  let context = null
  let deleteContext = null
  console.log("prevalidate")
  for (let [key, val] of formData.entries()) {
    context = contextPattern.exec(key)
    console.log(key,val)
    let value = val as string
    if (context == null) {
      deleteContext = deletePattern.exec(key)
      if (deleteContext == null) {
        if (key == 'name') {
          name = value
          if (list_reference == '0') {
            list_reference = uuidv4()
          }
        }
      } else {
        deleteSets.push({
            id: '0',
            context: '',
            position: parseInt(deleteContext[1]),
            list_reference: list_reference,
            recipe_id: id
          })
      }
    } else {
      if (context[2] == '0') {
        createSets.push({
          id: uuidv4(),
          context: value,
          position: parseInt(context[1]),
          list_reference: list_reference,
          recipe_id: id
        })
      } else {
        updateSets.push({
          id: context[2],
          context: value,
          position: parseInt(context[1]),
          list_reference: list_reference,
          recipe_id: id
        })
      }
    }
  }
  return [deleteSets, updateSets, createSets, name, list_reference]

}
