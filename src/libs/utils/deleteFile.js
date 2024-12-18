import { promises as fs } from 'fs';

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code || 'UNKNOWN_ERROR'
    };
  }
};