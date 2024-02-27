export function getImageUrl(name) {
  const path = `../../../assets/dq/${name}.png`;
  const modules = import.meta.globEager("@/assets/dq/*.png");
  return modules[path].default;
}
