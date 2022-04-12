exports.up =  function(knex) {
  //  await knex.raw("drop table if exists reviews");
  return  knex.schema.createTable("reviews", (table) => { 
              table.increments("review_id").primary();
              table.text("content");
              table.integer("score");
              table.integer("movie_id").unsigned().notNullable();
              table.integer("critic_id").unsigned().notNullable();
              table
                .foreign("movie_id")
                .references("movies.movie_id")
                .onDelete("cascade");
              table
                .foreign("critic_id")
                .references("critics.critic_id")
                .onDelete("cascade");
              table.timestamps(true, true);
        })
        // .then(()=> knex("reviews").select("*"));   
    // return await knex("reviews").select("*").first();
};

exports.down = function(knex) {
  // return knex("reviews").truncate();
  return knex.schema.dropTable("reviews"); 
};
