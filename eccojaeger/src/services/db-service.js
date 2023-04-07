import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { getAccountId, getToken } from '../utilities/utils';


//const tableName = 'productData';
// var tableName = getToken('buyerId').then(data => {
//   if (data) {
//     tableName = `productData${data}`
//   } else {
//     tableName = 'productData'
//   }
// })

const getTableName = () => {
  return 'productData' + getAccountId()
}
enablePromise(true);

export const getDBConnection = async () => {

  return openDatabase({ name: 'product-data.db', location: 'default' });
};

export const createTable = async (db) => {
  // create table if not exists
  // var name = 'productData'
  // var tName = await getToken('buyerId')
  // if (tName) {
  //   name = name + tName
  // }
  let name = getTableName()
  const query = `CREATE TABLE IF NOT EXISTS ${name}(
        title TEXT,
        prodJson TEXT,
        itemNumber TEXT,
        category TEXT
    );`;

  await db.executeSql(query);
};

export const checkIfTableExist = async (db, success) => {
  //var name = 'productData'
  //const m = await getToken('buyerId')

  await createTable(db)
  let name = getTableName()
  const query = `SELECT * FROM ${name}`//`SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`;
  //const resp = await db.executeSql(query);
  try {
    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        //console.log("Query completed");
        success(results?.rows?.length)
      });

    })
  }
  catch (error) {
    success(0)
  }
}

export const getProductItems = async (db) => {
  let tableName = getTableName()
  try {
    const todoItems = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);//LIMIT 1 OFFSET 0
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const getProductPaginatedItems = async (db, limit, offset) => {
  let tableName = getTableName()
  try {
    const todoItems = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName} ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`);//LIMIT 1 OFFSET 0
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

// export const searchItem = async (db, term) => {
//   try {
//     const todoItems = [];
//     const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE title LIKE '%${term}%' ORDER BY title ASC`)
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         todoItems.push(result.rows.item(index))
//       }
//     });
//     return todoItems;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get todoItems !!!');
//   }
// };

export const searchItem = async (db, term, category = null) => {
  let tableName = getTableName()
  try {
    const todoItems = [];
    let results;
    let queryString = isNaN(term) ? `title LIKE '%${term}%'` : `itemNumber =${term}`

    if (!category) {
      results = await db.executeSql(`SELECT * FROM ${tableName} WHERE ${queryString} ORDER BY title ASC`)

    } else {
      results = await db.executeSql(`SELECT * FROM ${tableName} WHERE category = ${category} AND ${queryString}  ORDER BY title ASC`)
    }

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const productByCategory = async (db, term, limit, offset) => {
  let tableName = getTableName()
  try {
    const todoItems = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE category=${term} ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};
export const saveProductItems = async (db, todoItems, success, error) => {
  let tableName = getTableName()
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, title, prodJson, itemNumber, category) values` +
    todoItems.map(i => `(${i.id}, ${JSON.stringify(i.title).replace(/'/g, '')}, '${JSON.stringify(i).replace(/'/g)}', '${i?.itemNumber ? i.itemNumber : "null"}', '${i?.productCategoryId.length > 0 ? i?.productCategoryId[0] : "null"}')`).join(',');

  try {
    const results = await db.executeSql(insertQuery)
    if (results?.length > 0) {
      success(true)
    }

  } catch (error) {
    console.error(error);
    error(true)
    throw Error('Failed to get todoItems !!!');
  }
  // db.transaction(
  //   (tx) => {
  //     tx.executeSql(insertQuery, [], (tx, results) => {
  //       success(true)
  //     })
  //   },
  //   (err) => {
  //     error(false)
  //   })
};

export const deleteItems = async (db, ids) => {
  let tableName = getTableName()
  const deleteQuery = `DELETE from ${tableName} where rowid in (${ids})`;

  try {
    const results = await db.executeSql(deleteQuery);
    //console.log(results)
  } catch (error) {
    //console.log(error)
  }
};

export const deleteProductItem = async (db, id) => {
  let tableName = getTableName()
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteAllItem = async (db) => {
  let tableName = getTableName()
  const deleteQuery = `DELETE from ${tableName}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db) => {
  let tableName = getTableName()
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};


