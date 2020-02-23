import {expect} from 'chai';
import {describe} from 'mocha';
import {createConnection, getConnection, getConnectionOptions, getRepository} from "typeorm";
import {Group} from "../entity/Group";
import {loadFixtures} from "../load-fixtures";


const connectDb = async () => {
  await disconnectDB();
  const connectionOptions = await getConnectionOptions();
  await createConnection(Object.assign(connectionOptions, {
    logging: false
  }));
};

const disconnectDB = async () => {
  const connection = await getConnection();
  if (connection.isConnected) {
    await connection.close()
  }
};


describe('Limit joined results', () => {

  beforeEach(async () => {
    await connectDb();
    await loadFixtures('./src/fixtures');
  });

  after(async () => {
    await disconnectDB();
  });

  it('Should return 3 items when using take(3)', async () => {

    const groups = await getRepository(Group)
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.members', 'u')
      .take(3)
      .getMany();

    expect(groups.length).to.equal(3);

  });

  it('Should return 3 items when sorting by User.id and using take(3)', async () => {

    const groups = await getRepository(Group)
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.members', 'u')
      .orderBy('g.id')
      .addOrderBy('u.id')
      .take(3)
      .getMany();

    expect(groups.length).to.equal(3);

  });

});
