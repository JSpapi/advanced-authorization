export const convertToBase = (file: Blob) => {
      // !CAN NOT HANDLE WITH TYPE PROBLEM NULL AND EXACT TYPE AND HAD TO USE ANY HERE, AFTER GETTING  MORE INFO GONNA SOLVE IT

  return new Promise<string>((resolve: any, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};
