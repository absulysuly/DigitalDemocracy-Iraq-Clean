const mockModel = {
  findMany: async (...args: any[]): Promise<any> => [],
  findUnique: async (...args: any[]): Promise<any> => null,
  findFirst: async (...args: any[]): Promise<any> => null,
  create: async (...args: any[]): Promise<any> => ({}),
  update: async (...args: any[]): Promise<any> => ({}),
  delete: async (...args: any[]): Promise<any> => ({}),
  deleteMany: async (...args: any[]): Promise<any> => ({ count: 0 }),
  updateMany: async (...args: any[]): Promise<any> => ({ count: 0 }),
  count: async (...args: any[]): Promise<any> => 0,
  aggregate: async (...args: any[]): Promise<any> => ({}),
  groupBy: async (...args: any[]): Promise<any> => []
};

export const prisma: any = {
  post: { ...mockModel },
  user: { ...mockModel },
  like: { ...mockModel },
  comment: { ...mockModel },
  place: { ...mockModel },
  event: { ...mockModel }
};
