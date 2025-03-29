using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIPlaceController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public AIPlaceController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        //[HttpPost("check-travel-place")]
        //public async Task<IActionResult> CheckTravelPlace(  IFormFile imageFile)
        //{
        //    if (imageFile == null || imageFile.Length == 0)
        //    {
        //        return BadRequest("Image file is required.");
        //    }

        //    var request = new HttpRequestMessage
        //    {
        //        Method = HttpMethod.Post,
        //        RequestUri = new Uri("https://identify-places-from-image-without-location.p.rapidapi.com/upload_image_and_get_place_details"),
        //        Headers =
        //        {
        //            { "x-rapidapi-key", "3a306bacd6mshe0797156b4086b8p1ce837jsn04167e84fe63" }, // Use your own key
        //            { "x-rapidapi-host", "identify-places-from-image-without-location.p.rapidapi.com" },
        //        }
        //    };

        //    var content = new MultipartFormDataContent();
        //    var fileStream = imageFile.OpenReadStream();
        //    content.Add(new StreamContent(fileStream), "image", imageFile.FileName);

        //    request.Content = content;

        //    try
        //    {
        //        using (var response = await _httpClient.SendAsync(request))
        //        {
        //            response.EnsureSuccessStatusCode();
        //            var body = await response.Content.ReadAsStringAsync();
        //            return Ok(body); // Return the response to the client
        //        }
        //    }
        //    catch (HttpRequestException e)
        //    {
        //        return StatusCode(500, $"Error making API call: {e.Message}");
        //    }
        //}


        [HttpPost("predict")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var url = "https://kamelfcis-tourism-e989240b868f.herokuapp.com/upload-image";
            var formData = new MultipartFormDataContent();
            var fileContent = new StreamContent(file.OpenReadStream());

            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/jpeg");

            formData.Add(fileContent, "file", file.FileName);

            try
            {
                // Sending the request to the external API
                var response = await _httpClient.PostAsync(url, formData);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();

                    // Check if the top prediction is "Tut Ankh Amun" and add the description
                    if (result.Contains("Tut Ankh Amun"))
                    {
                        var enhancedResult = new
                        {
                            top_prediction = "Tut Ankh Amun",
                            description = "Tutankhamun (1332–1323 BCE), of the 18th Dynasty, became pharaoh at a young age. " +
                                          "He is best known for his nearly intact tomb, discovered in 1922, which provided an unprecedented insight into ancient Egyptian burial customs. " +
                                          "His reign marked the restoration of traditional Egyptian religion after the radical changes introduced by his predecessor, Akhenaten."
                        };

                        return Ok(enhancedResult);
                    }
                    else if(result.Contains("Akhenaten"))
                    {
                        var enhancedResult = new
                        {
                            top_prediction = "Akhenaten",
                            description = "Akhenaten (1353–1336 BCE), of the 18th Dynasty, is often called the 'heretic pharaoh' for his religious revolution.  " +
                                        "He abandoned the traditional Egyptian pantheon in favor of worshiping Aten, the sun disk, establishing Egypt's first monotheistic religion.  " +
                                        "He built the city of Amarna as the new religious capital, but his reforms were reversed after his death."
                        };

                        return Ok(enhancedResult);
                    }
                    else if (result.Contains("Ramesses II"))
                    {
                        var enhancedResult = new
                        {
                            top_prediction = "Ramesses II",
                            description = "Ramesses II (1279–1213 BCE), also known as Ramesses the Great, was one of Egypt's most powerful and longest-reigning pharaohs, ruling during the 19th Dynasty. " +
                                        "He is famed for his military campaigns, the construction of the magnificent Abu Simbel temples, and signing the first recorded peace treaty with the Hittites. " +
                                        "His legacy is marked by grand monuments and an era of prosperity."
                        };

                        return Ok(enhancedResult);
                    }
                    else if (result.Contains("Thutmose III"))
                    {
                        var enhancedResult = new
                        {
                            top_prediction = "Thutmose III",
                            description = "Thutmose III (1479–1425 BCE), of the 18th Dynasty, is known as the 'Napoleon of Egypt' due to his unparalleled military campaigns. " +
                                        "He expanded Egypt’s empire to its greatest territorial extent, leading 17 victorious military expeditions." +
                                        "His reign also saw advancements in art, architecture, and administration, securing Egypt's golden age."
                        };

                        return Ok(enhancedResult);
                    }
                    else if (result.Contains("Nefertiti"))
                    {
                        var enhancedResult = new
                        {
                            top_prediction = "Nefertiti",
                            description = "Nefertiti (c. 1370–1330 BCE), of the 18th Dynasty, was the queen and great royal wife of Akhenaten." +
                                        "She played a crucial role in the religious transformation of Egypt, alongside her husband, promoting the worship of Aten." +
                                        "Her iconic bust, discovered in 1912, remains one of the most famous symbols of ancient Egyptian beauty and power."
                        };

                        return Ok(enhancedResult);
                    }
                    return Ok(result); // Return the external API's response if it's not "Tut Ankh Amun"
                }
                else
                {
                    return BadRequest("Error calling the external API.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }

}
