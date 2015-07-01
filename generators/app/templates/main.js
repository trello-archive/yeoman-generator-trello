var authenticationSuccess = function() {
	$('#stage1').css('display','block');

	// Load Boards
	Trello.get('/member/me/boards', 
		function(success) {
			for (var i = success.length - 1; i >= 0; i--) {
				board = success[i];
				var boardOption = document.createElement("option");
				boardOption.value = board.id;
				boardOption.innerText = board.name;
				$('#boardList').append(boardOption);
			};
		}, 
		function(error) {
		}
	);
}

var authenticationError = function(error) {
	$('#signInError').innerHTML = error;

}

$(document).ready(function() {
	$("#signInButton").click(function() {
		console.log("Authenticating");
		Trello.authorize({
	      type: 'popup',
	      name: 'Sample Trello Application',
	      scope: {read: true, write: true, account: true},
	      success: authenticationSuccess,
	      error: authenticationError
	    });
	});

	$("#boardList").change(function() {
		console.log("Updating list of lists.");
		$('#listList').empty();
		$('#listList').append("<option value='false'>Select a List</option>");

		$('#stage2').css('display','block');

		boardId = $('#boardList').val();
		if(boardId == "false") {
			return;
		}

		$('#boardId').text(boardId);


		Trello.get('/boards/' + boardId + '/lists', 
			function(success) {

				for (var i = success.length - 1; i >= 0; i--) {
					list = success[i];
					var listOption = document.createElement("option");
					listOption.value = list.id;
					listOption.innerText = list.name;
					$('#listList').append(listOption);
				};
			}, 
			function(error) {
			}
		);
	});

	$("#listList").change(function() {
		console.log("Updating list of cards.");
		$('#cardList').empty();
		$('#cardList').append("<option value='false'>Select a Card</option>");

		$('#stage3').css('display','block');

		listId = $('#listList').val();

		if(listId == "false") {
			return;
		}
		$('#listId').text(listId);

		Trello.get('/lists/' + listId + '/cards', 
			function(success) {
				for (var i = success.length - 1; i >= 0; i--) {
					card = success[i];
					var cardOption = document.createElement("option");
					cardOption.value = card.id;
					cardOption.innerText = card.name;
					$('#cardList').append(cardOption);
				};
			}, 
			function(error) {
			}
		);
	});

	$("#cardList").change(function() {
		console.log("Loading card.");

		$('#stage4').css('display','block');

		cardId = $('#cardList').val();

		if(cardId == "false") {
			return;
		}
		Trello.get('/cards/' + cardId, 
			function(success) {
				$('#cardName').text( success.name + "(" + cardId + ")" );
				$('#cardDescription').text( success.desc );
				$('#cardLink').attr("href",success.shortUrl);
			}, 
			function(error) {
			}
		);
	});


});