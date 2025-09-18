export function formDataToObject(formData: FormData): Record<string, unknown> {
  const object: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return object;
}
