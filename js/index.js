// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// remove the focused state after click,
// otherwise bootstrap will still highlight the link
$("a").mouseup(function(){
    $(this).blur();
})

$( document ).ready(function() {

	$('.impact-number').html('<b>$5</b> <br> provides <b>meals</b> for <br><b>' + Math.round(5/.04/4) + ' families.</b>');


	for (var i = 0; i < 25/250; i++) {
		var span = document.createElement("span");
		var img = document.createElement("img");
		img.src = "images/ricebowl.png";
		img.height = 30;
		span.appendChild(img);
  		$('.rice-bowls').append(span);
  	}

	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('user_friends, public_profile, email');
	provider.setCustomParameters({
	  'display': 'popup'
	});

	var friends = ['arianna', 'ashley', 'marvin', 'wayland']

	for (var i = 0; i < friends.length; i++) {
		var span = document.createElement("span");
		var img = document.createElement("img");
		img.src = "images/" + friends[i] + ".jpg";
		img.height = 65;
		if (i < friends.length - 1)
			span.className = "friends-pics-indiv";

		span.appendChild(img);
		$('.friends-pics').append(span);
	}

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var database = firebase.database();

  var databaseRef = database.ref();

  var databaseCounter = database.ref('feature/feature-counter/' + 'counter')
  var databaseFeature = database.ref('feature/')

  console.log(databaseCounter);

  databaseCounter.on('value', function(snapshot) {
  	updateDonorCount(snapshot.val())
  });

  database.ref('feature/feature-video/').on('value', function(snapshot) {
  	$('#video').attr('src', snapshot.val())
  });

  database.ref('feature/long-title/').on('value', function(snapshot) {
  	$('.long-title').text(snapshot.val());
  })

  database.ref('feature/cause-description/').on('value', function(snapshot) {
  	$('.cause-description').text(snapshot.val());
  })

  database.ref('feature/charity-description/').on('value', function(snapshot) {
  	$('.charity-description').text(snapshot.val());
  })

  $('.donation-box').keyup(function (e) {

  	var amount = 1
  	if ($('.donation-box').val()) {
  		amount = parseInt($('.donation-box').val());
  		var donatedAmount = amount/.04;
  		console.log("here");

  		$('.impact-number').html('<b>$' + amount + '</b><br> provides <b>meals</b> for <br><b>' + Math.round(donatedAmount/4) + ' families.</b>');

  	}
  	else {
  		var donatedAmount = amount/.04;

  		$('.impact-number').html('<b>$' + amount + '</b><br> provides <b>meals</b> for <br><b>' + Math.round(donatedAmount/4) + ' families.</b>');
  	}

  	$('.rice-bowls').empty();

	console.log(donatedAmount/10);

	numBowls = donatedAmount/1000;


	for (var i = 0; i < donatedAmount/250; i++) {
		var span = document.createElement("span");
		var img = document.createElement("img");
		img.src = "images/ricebowl.png";
		img.height = 30;
		span.appendChild(img);
  		$('.rice-bowls').append(span);
  	}

  });

  $('.facebook-login').click(function() {
	  	console.log("hell");
	  	firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  console.log(token);
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  console.log(error);
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	});

	$('.donation-button').click(function() {
		$('#payment').modal('show');
		$('.donate-amount').text('$' +  $('.donation-box').val());
	});

	$('.donate').click(function() {
		$('#payment').modal('hide');
		database.ref('feature/feature-counter/counter').transaction(function(counter) {
			database.ref('feature/feature-counter/').set({counter: counter + 1})
		});
		$('#thank-you').modal('show');
		var amount = $('.donation-box').val();
		$('.amount-donated').text('$' + amount);
		$('.donated-impact').text('will be used to provide ' + amount/.04 + ' meals to children.')
	});

});

function updateDonorCount(value) {
	console.log(value);
	$('.counter').text(value);
}