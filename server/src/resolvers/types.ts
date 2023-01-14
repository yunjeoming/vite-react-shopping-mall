type Method = 'Query' | 'Mutation';
export type Resolvers = {
  [k: string]: {
    [key: string]:(
      parent: any,
      args: {[key: string]: any},
      context: {},
      info: any
    ) => any
  }
}