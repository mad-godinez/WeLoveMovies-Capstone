exports.up =  function(knex) {
  //  await knex.raw("drop table if exists critics");
  return  knex.schema.createTable("critics", (table) => { 
                table.increments("critic_id").primary();
                table.string("preferred_name");
                table.string("surname");
                table.string("organization_name");
                table.timestamps(true, true);
              })
              // .then(()=> knex("critics").select("*"));   
              //  await knex("critics").select("*").first();
};

exports.down = function(knex) {
  // return knex("critics").truncate();  
  return knex.schema.dropTable("critics"); 
};
