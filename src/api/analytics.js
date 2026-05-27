import instance from './config'

export const postUploadImage =
  async (data) => {
    const response = await instance.post(
      `/upload-image`, data,
      {
        // headers: getHeader(),
      }
    );
    return response.data;
  };

export const postLeaderboardSummary = async (
) => {
  const response = await instance.get(
    `/claims`,
    {
      // headers: getHeader(),
    }
  );

  return response.data;
};
