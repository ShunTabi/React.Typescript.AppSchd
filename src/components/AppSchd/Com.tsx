const today = () => {
  const now: Date = new Date(),
    y: string = now.getFullYear().toString().padStart(4, "0"),
    m: string = (now.getMonth() + 1).toString().padStart(2, "0"),
    d: string = now.getDate().toString().padStart(2, "0"),
    h: string = now.getHours().toString().padStart(2, "0"),
    mm: string = now.getMinutes().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
};

print();
export default { test };
