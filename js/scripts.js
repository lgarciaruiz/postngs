$(document).ready(function(){
    var currStoryContainer = $('#toRead');
    var instructionsDiv = '<div class="current-stories" id="instructions">Click on a story to read!</div>'

    var story1 = '<div class="current-stories active" id="read-1"><h5>What is Lorem Ipsum?</h5> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br><br><i class="fa fa-thumbs-up"></i></div>';
    var story2 = '<div class="current-stories" id="read-2"><h5>Why do we use it?</h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).<br><br><i class="fa fa-thumbs-up"></i></div>';

    var currentStory = false;
    
    $('#story-1').click(function(){
        if(!currentStory) {
            $('#instructions').remove();
            currStoryContainer.append(story1);
            currentStory = true;
        } else {
            currStoryContainer.empty();
            currStoryContainer.append(instructionsDiv);
            currentStory = false;
        }
    });
    
    $('#story-2').click(function(){
       
        if(!currentStory) {
            $('#instructions').remove();
            currStoryContainer.append(story2);
            currentStory = true;
        } else {
            currStoryContainer.empty();
            currStoryContainer.append(instructionsDiv);
            currentStory = false;
        }
    });
});