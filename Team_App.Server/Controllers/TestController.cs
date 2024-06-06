using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Team_App.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestDataController : Controller
    {
        const string connStr = "Host=localhost; Database=postgres; Username=postgres; Password=6969";
        private readonly NpgsqlConnection conn = new(connStr);

    [HttpGet] 
        public IActionResult Get() 
        {
            try
            {
                conn.Open();

                if (conn.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Success open postgreSQL connection.");
                }

                string sql = "SELECT json_agg(\"Team\") FROM \"Team\"";
                using (var command = new NpgsqlCommand(sql, conn))
                {
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        return Ok(reader[0]);
                    }
                }

                Console.WriteLine("Success close postgreSQL connection.");
                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }
    }
    
}
