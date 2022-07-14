using MgApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MgApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {

            _configuration = configuration;
        }
        public DataTable GetUsers()
        {
            string query = @"
                   select * from dbo.Users";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MGAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return table;
        }


        public string CheckUser(string userlogin, string userpsw)
        {

            var id = "";


            List<string> stringList = new List<string> { "string1", "string2" };
            foreach (DataRow row in this.GetUsers().Rows)
            {
                if (userlogin == row["UserLogin"].ToString() && userpsw == row["UserPassword"].ToString())
                {
                    id = row["UserId"].ToString();


                }

            }
            return id;
        }
        public string UserRole(string userlogin, string userpsw)
        {


            var role = "";

            List<string> stringList = new List<string> { "string1", "string2" };
            foreach (DataRow row in this.GetUsers().Rows)
            {
                if (userlogin == row["UserLogin"].ToString() && userpsw == row["UserPassword"].ToString())
                {

                    role = row["UserRole"].ToString();

                }

            }
            return role;
        }

        // GET api/values
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            if (CheckUser(user.UserLogin, user.UserPassword) != "")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super secret key"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var Claims = new List<Claim>
                     {
            new Claim(ClaimTypes.NameIdentifier,CheckUser(user.UserLogin, user.UserPassword)),
            new Claim(ClaimTypes.Role,UserRole(user.UserLogin,user.UserPassword))
                     };
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:24543",
                    audience: "http://localhost:24543",
                    claims: Claims,
                    expires: DateTime.Now.AddHours(5),
                    signingCredentials: signinCredentials


                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });

            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
