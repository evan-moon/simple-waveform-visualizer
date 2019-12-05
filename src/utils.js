export function fromTitleCaseToStartCase (string) {
  return string.replace(/(.)([A-Z])/g, '$1 $2');
}