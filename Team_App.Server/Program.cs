using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text.Json.Nodes;
using Team_App.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


/*

var connStr = "Host=localhost; Database=postgres; Username=postgres; Password=6969";

var conn = new NpgsqlConnection(connStr);

try {
    conn.Open();
    if (conn.State == System.Data.ConnectionState.Open)
    {
        Console.WriteLine("Success open postgreSQL connection.");
    }

    
    //string keys = "(\"Id\", \"ProfileUrl\", \"Name\", \"Role\", \"Salary\", \"Bio\")";
    //string values = "(:Id, :ProfileUrl, :Name, :Role, :Salary, :Bio)";
    //string sql = "INSERT INTO \"Team\""  + keys + " values " + values;
    

    //string sql = "SELECT * FROM \"Team\"";

    string sql = "SELECT json_agg(\"Team\") FROM \"Team\"";
    using (var command = new NpgsqlCommand(sql, conn))
    {
        
        //command.Parameters.AddWithValue("Id", 0);
        //command.Parameters.AddWithValue("ProfileUrl", "N/A");
        //command.Parameters.AddWithValue("Name", "N/A");
        //command.Parameters.AddWithValue("Role", "N/A");
        //command.Parameters.AddWithValue("Salary", 1);
        //command.Parameters.AddWithValue("Bio", "N/A");
        

        //command.ExecuteNonQuery();

        
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            Console.WriteLine(reader[0]);
          
            //Console.WriteLine("Id: " + reader["Id"]);
            //Console.WriteLine("ProfileUrl: " + reader["ProfileUrl"]);
            //Console.WriteLine("Name: " + reader["Name"]);
            //Console.WriteLine("Role: " + reader["Role"]);
            //Console.WriteLine("Salary: " + reader["Salary"]);
            //Console.WriteLine("Bio: " + reader["Bio"]);
            

        }
    }


    Console.WriteLine("Success close postgreSQL connection.");
    conn.Close();
}
catch (Exception ex) {
    conn.Close();
    Console.WriteLine("Success close postgreSQL connection.");
    Console.WriteLine(ex.Message);
}

*/

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
