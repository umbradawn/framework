import { User } from '../entity/User';
import { getConnection } from 'typeorm';

const showHome = async () => {
  try {
    // const conn = getConnection('connection1');
    // multiple connection exampe of same table from 2 different databases
    // const conn2 = getConnection('connection2');
    // const users = await conn.getRepository(User).find();
    // const users2 = await conn2.getRepository(User).find();
    // return {
    //   users,
    //   users2,
    // };

    // Single connection
    // With single connection you have the option to use active record or data mapper unlike multiple connection where you must use Data Mapper.
    // Data Mapper:
    //const users = await conn.getRepository(User).find();
    // Active Record
    const users = await User.find();
    return {
      users,
    };
  } catch (e) {
    console.log(e);
  }
  return {
    message: "You can't access api directly like this.",
  };
};
export default {
  showHome,
};
