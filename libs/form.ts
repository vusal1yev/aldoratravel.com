type FormValue = {
  name: string;
  data: any;
};

export const formCreator = (values: FormValue[]) => {
  const formData = new FormData();

  values.map((value) => {
    if (value.data || value.data === 0) {
      formData.append(value.name, value.data);
    }
  });

  return formData;
};
