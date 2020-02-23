import * as path from 'path';
import {Builder, fixturesIterator, Loader, Parser, Resolver} from 'typeorm-fixtures-cli/dist';
import {getConnection, getRepository} from 'typeorm';

export const loadFixtures = async (fixturesPath: string) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    const it = fixturesIterator(fixtures);
    let result = it.next();
    while (!result.done) {
      const entity = await builder.build(result.value);
      // @ts-ignore
      await getRepository(entity.constructor.name).save(entity);
      result = it.next();
    }
  } catch (err) {
    throw err;
  }
};
