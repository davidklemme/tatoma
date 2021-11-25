import neo4j from 'neo4j-driver/lib/browser/neo4j-web';
import getKey from '../assets/globalVars';

const ReadNeo4J = async (query, uuid) => {
  const driver = neo4j.driver(
    await getKey('NEO4J', 'URI'),
    neo4j.auth.basic(
      await getKey('NEO4J', 'USER'),
      await getKey('NEO4J', 'PASS'),
    ),
  );
  if (!uuid) {
    console.warn('uuid is empty - cannot grab graph data for unknown user');
    return;
  }
  const session = driver.session();
  let topics = [];
  await session
    .run(query)
    .then(result => {
      session.close();
      //TODO clean return. Currently this assumes a "count" as a second return field. Doesnt make sense in all cases and leads to undefined..
      topics = result.records.map(item => {
        return {
          key: item._fields[0],
          count: item._fields[1]?.low,
        };
      });
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
  console.debug('NEO4J --- api response:\n', topics, '\n from query: ', query);
  return topics;
};

export default ReadNeo4J;
//TODO define methods for all use cases (overload base method with different queries and write data into according objects)
