// utils/validateBug.js
export function validateBugInput({ title, description }) {
  return typeof title === 'string' && title.length > 3 &&
         typeof description === 'string' && description.length > 5;
}
