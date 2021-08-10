const dataFilter = (result, filter, key = true) => {
  if (!result) return [{}];
  if (!Array.isArray(result)) return [{ ...result.data, key: result.key }];
  if (key) result = result.map(({ data, key }) => ({ ...data, key }));
  if (filter) {
    return result.filter(filter);
  }
  return result;
};

export { dataFilter };
