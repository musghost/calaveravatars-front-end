
	(function(){
		var cColors = [
				"amarilla.png",
				"aqua.png",
				"morada.png",
				"roja.png"
			],
			url = [
				"afro/",
				"ciclista/",
				"deportista/",
				"emo/",
				"fresa/",
				"hipster/",
				"rapero/",
				"rasta/",
				"rockera/",
				"seniora/"
			],
			buttons = $("#buttons").find("a"),
			colors = $("#color").find("i"),
			backs = $("#back").find("i"),
			currentColor = 0,
			currentURL = 0,
			lastURL = url.length - 1,
			currentBackground = "#ffffff",
			rute = "img/calaveras/",
			wait = $(".wait"),
			newImage = function(ruteImg){
				var img = new Image();
				img.src = ruteImg;
				//img.setAttribute("class", "calavera");
				$(img).css("background", currentBackground);
				img.onload = function(){
					$("#buttons").find(".calavera img").first().remove();
					$("#buttons").find(".calavera").append(img);
					wait.removeClass("show");
				}
			},
			form = $("form[name=send]");

		buttons.eq(0).click(function(a){
			a.preventDefault();
			currentURL = (currentURL - 1 < 0) ? lastURL : currentURL - 1;
			wait.addClass("show");
			newImage(rute + url[currentURL] + cColors[currentColor]);
			console.log(rute + url[currentURL] + cColors[currentColor]);
		});
		buttons.eq(1).click(function(a){
			a.preventDefault();
			currentURL = (currentURL + 1 > lastURL) ? 0 : currentURL + 1;
			wait.addClass("show");
			newImage(rute + url[currentURL] + cColors[currentColor]);
			console.log(rute + url[currentURL] + cColors[currentColor]);
		});
		colors.each(function(a){
			$(this).click(function(b){
				b.preventDefault();
				if(currentColor !== a){
					currentColor = a;

					newImage(rute + url[currentURL]+ cColors[currentColor]);
				}
			});
		});
		backs.each(function(a){
			$(this).click(function(b){
				b.preventDefault();
				var col = currentBackground = $(this).css("background");
				$(".calavera").css("background", col);
			});
		});
		
		form.find("input[type=text]")
			.keyup(function(a){
				var val = $(this).val();
				if(val.length > 6) $(this).val(val.substr(0,6));
		});

		form.submit(function(a){
			a.preventDefault();
			var text = $(this)
					.find("input")
					.first()
					.val();
			$.ajax({
				type: "POST",
				url: "http://162.243.143.152:3000",
				data:{
					"cc": currentColor,
					"cu": currentURL,
					"tx": text
				},
				error: function(a,b){
					console.log("error");
				},
				success: function(a){
					console.log(a);
				}
			});
		});


	})();
