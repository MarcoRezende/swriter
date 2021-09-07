const arrayOfObjToArray = (arrayOfObj: Record<string, string>[]): string[] => {
  const all: string[] = [];

  arrayOfObj.forEach(obj => {
    all.push(...Object.values(obj));
  });

  return all;
};
