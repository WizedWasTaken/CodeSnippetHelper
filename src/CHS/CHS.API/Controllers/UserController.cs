using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserRepository userRepository) : ControllerBase
    {
        private readonly IUserRepository _userRepository = userRepository;

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var users = _userRepository.GetAll();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _userRepository.GetById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("email/{email}")]
        public IActionResult GetByEmail(string email)
        {
            try
            {
                var user = _userRepository.GetByEmail(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            try
            {
                _userRepository.Add(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(User user)
        {
            try
            {
                _userRepository.Update(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userRepository.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            try
            {
                var userDb = _userRepository.GetByEmail(user.Email);

                if (userDb == null)
                {
                    return NotFound();
                }

                if (!user.VerifyPassword(user.Password, userDb.Password))
                {
                    return Unauthorized();
                }

                return Ok(userDb);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            try
            {
                var userDb = _userRepository.GetByEmail(user.Email);

                if (userDb != null)
                {
                    return Conflict("Denne email findes allerede.");
                }

                _userRepository.Add(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}