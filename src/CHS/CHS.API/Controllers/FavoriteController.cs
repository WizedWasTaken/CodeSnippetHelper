using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;

        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] Snippet snippet)
        {
            try
            {
                var favorites = _favoriteRepository.GetFavoritesFromPost(snippet);
                return Ok(favorites);
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
                var favorite = _favoriteRepository.GetById(id);
                return Ok(favorite);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Favorite favorite)
        {
            try
            {
                _favoriteRepository.Add(favorite);
                return Ok("Favorite added successfully");
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
                _favoriteRepository.Delete(id);
                return Ok("Favorite deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("snippet")]
        public IActionResult Snippet([FromBody] Snippet snippet, [FromQuery] User user)
        {
            try
            {
                _favoriteRepository.AddNewFavoriteToSnippet(snippet, user);
                return Ok("Favorite added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}