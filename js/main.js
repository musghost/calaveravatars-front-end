
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
				img.onload = function(){
					$("#buttons").find(".calavera img").first().remove();
					$("#buttons").find(".calavera").append(img);
					wait.removeClass("show");
				}
			},
			form = $("form[name=send]"),
			textName = $(".text");

		buttons.eq(0).click(function(a){
			a.preventDefault();
			currentURL = (currentURL - 1 < 0) ? lastURL : currentURL - 1;
			wait.addClass("show");
			newImage(rute + url[currentURL] + cColors[currentColor]);
			textName.attr("class", "text " + url[currentURL].substr(0, url[currentURL].length - 1) + " " + cColors[currentColor].substr(0, cColors[currentColor].length - 4));
			//console.log(rute + url[currentURL] + cColors[currentColor]);
		});
		buttons.eq(1).click(function(a){
			a.preventDefault();
			currentURL = (currentURL + 1 > lastURL) ? 0 : currentURL + 1;
			wait.addClass("show");
			newImage(rute + url[currentURL] + cColors[currentColor]);
			textName.attr("class", "text " + url[currentURL].substr(0, url[currentURL].length - 1) + " " + cColors[currentColor].substr(0, cColors[currentColor].length - 4));
			//console.log(rute + url[currentURL] + cColors[currentColor]);
		});
		colors.each(function(a){
			$(this).click(function(b){
				b.preventDefault();
				if(currentColor !== a){
					currentColor = a;
					newImage(rute + url[currentURL]+ cColors[currentColor]);
					textName.attr("class", "text " + url[currentURL].substr(0, url[currentURL].length - 1) + " " + cColors[currentColor].substr(0, cColors[currentColor].length - 4));
				}
			});
		});
		backs.each(function(a){
			$(this).click(function(b){
				b.preventDefault();
				var col = currentBackground = $(this).data("cl");
				$(".calavera").css("background", col);
			});
		});
		
		form.find("input[type=text]")
			.keyup(function(a){
				var val = $(this).val();
				if(val.length > 6) $(this).val(val.substr(0,6));
				else{
					var steps,
						spans = [];
					if(val.length > 0)
						steps = 3;
					if(val.length > 2)
						steps = 2;
					if(val.length > 4)
						steps = 1;
					for(var x = steps, y = 0; y < val.length; x++, y++){
						var span = $("<span class='ch" + x + "'>");
						span.html(val[y]);
						spans.push(span);
					};
					textName.html("");
					textName.append(spans);
				}
		});

		form.submit(function(a){
			a.preventDefault();
			var text = $(this)
					.find("input")
					.first()
					.val();
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/calas",
				data:{
					"cc": currentColor,
					"cu": currentURL,
					"tx": text,
					"bk": currentBackground
				},
				error: function(a,b){
				},
				success: function(a){
					
					var img = new Image();
					img.src = "http://localhost:3000/" + a.url.substr(7, a.url.length - 7);
					alert(a.url.substr(7, a.url.length - 7));
					img.onload = function(){
						$("#result").append(img);
					}
				}
			});
		});


	})();
