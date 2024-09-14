using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController(IFavoriteRepository favoriteRepository) : ControllerBase
    {
        private readonly IFavoriteRepository favoriteRepository = favoriteRepository;

        [HttpGet]
        public IActionResult Get(Snippet snippet)
        {
            try
            {
                var favorites = favoriteRepository.GetFavoritesFromPost(snippet);
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
                var favorite = favoriteRepository.GetById(id);
                return Ok(favorite);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {
            try
            {
                favoriteRepository.Add(favorite);
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
                favoriteRepository.Delete(id);
                return Ok("Favorite deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("snippet")]
        public IActionResult Snippet(Snippet snippet, User user)
        {
            try
            {
                favoriteRepository.AddNewFavoriteToSnippet(snippet, user);
                return Ok("Favorite added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}