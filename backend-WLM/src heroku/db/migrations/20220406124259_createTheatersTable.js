exports.up =  function(knex) {
  //  await knex.raw("drop table if exists theaters");
  return knex.schema.createTable("theaters", (table) => { 
                table.increments("theater_id").primary();
                table.string("name");
                table.string("address_line_1");
                table.string("address_line_2");
                table.string("city");
                table.string("state");
                table.string("zip");
                table.timestamps(true, true)
              })
              // .then(()=> knex("theaters").select("*"));   
              //  await knex("theaters").select("*").first();

};

exports.down = function(knex) {
  // return knex("theaters").truncate();
  return knex.schema.dropTable("theaters"); 
};
