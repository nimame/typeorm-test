import {expect} from 'chai';
import {describe} from 'mocha';
import {createConnection, getConnection, getRepository} from "typeorm";
import {Group} from "../entity/Group";
import {loadFixtures} from "../load-fixtures";


describe('Connection', () => {

  before(async () => {
    await createConnection();
    await loadFixtures('./src/fixtures');
  });

  after(async () => {
    getConnection().close()
  });

  describe('Limit joined results', () => {

    it('Should return 3 items when using take(3)', async () => {

      const groups = await getRepository(Group)
        .createQueryBuilder('g')
        .leftJoinAndSelect('g.members', 'u')
        .take(3)
        .getMany();

      expect(groups.length).to.equal(3);

    });

  })

});
