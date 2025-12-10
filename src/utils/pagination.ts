

export const getMeta = (totalData: number, page: number, pageSize: number): Meta => {
  const total_page = Math.ceil(totalData / pageSize);
  return {
    page,
    total_page,
    total_data: totalData,
  };
};


export const getPagination = (page: number, pageSize: number) => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  return { limit, offset };
};
