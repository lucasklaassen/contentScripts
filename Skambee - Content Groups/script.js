var autoContentGroupSetup = {
	init : {
		elements : function(){
			if(location.search === "?method=contentGroups.list" || location.search === "?method=contentGroups.list&TITLE=&&page=1"){
				var homeFeatureImage = ".homeFeatureImage";
				$('html').prepend('<iframe class="homeFeatureImage"></iframe');
				var pageFeatureImage = ".pageFeatureImage";
				$('html').prepend('<iframe class="pageFeatureImage"></iframe');
				var socialIcons = ".socialIcons";
				$('html').prepend('<iframe class="socialIcons"></iframe');
				$('body').not('.homeFeatureImage, .pageFeatureImage, .socialIcons').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Starting...</div></div>');
				$('.progress-bar').css('width', '10%');
				autoContentGroupSetup.automation.init(homeFeatureImage, 10);
				autoContentGroupSetup.automation.init(pageFeatureImage, 10);
				autoContentGroupSetup.automation.init(socialIcons, 10);
			} else {
				alert("You are not on the right page! Taking you there now...");
				location.href="/2014/settings/index.cfm?method=contentGroups.list";
			}
		},
	},
	automation : {
		init : function(iframe, progress) {
			$(iframe).attr("src", "/2014/settings/index.cfm?method=contentGroups.add");
			setTimeout(function() {
				autoContentGroupSetup.automation.addTitle(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addElement : function(iframe, elementTypeFunction, progress) {
			$(iframe).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				elementTypeFunction(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		initAddOutput : function(iframe, progress) {
			$(iframe).contents().find('.v65-view-group:eq(2)').find('.btn').trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.addOutput(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitle : function(iframe, progress) {
			if(iframe === ".homeFeatureImage"){
				$(iframe).contents().find('input[name="title"]').val("Homepage Feature Image");
			} else if( iframe === ".pageFeatureImage") {
				$(iframe).contents().find('input[name="title"]').val("Page Feature Image");
				$(iframe).contents().find('select[name="relatedTo"]').val("Pages");
			} else if( iframe === ".socialIcons" ) {
				$(iframe).contents().find('input[name="title"]').val("Social Icons");
			}
			$(iframe).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if(iframe === ".homeFeatureImage" || iframe === ".pageFeatureImage"){
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addPhoto, progress + 10);
				} else if( iframe === ".socialIcons") {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addOptionList, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOptionList : function(iframe, progress) {
			$(iframe).contents().find(".optionProperties").removeClass('hide');
			$(iframe).contents().find("[name='elementType']").val('OptionList').trigger('change');
			$(iframe).contents().find("[name='label']").val('Social Channel');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			var count = 0,
				 	titlesArray = ["facebook-squared", "twitter", "pinterest", "gplus", "youtube", "vimeo"];
			$(iframe).contents().find("[name='options']").each(function(){
				$(this).addClass("option" + count++);
			})
			for(i=0;i<count;i++){
				$(iframe).contents().find(".option" + i).val(titlesArray[i]);
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTitleField, progress + 10);
					$('.progress-bar').css("width", progress + '%');
					$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addPhoto : function(iframe, progress) {
			$(iframe).contents().find(".photoProperties").removeClass('hide');
			$(iframe).contents().find("[name='elementType']").val('Photo').trigger('change');
			$(iframe).contents().find("[name='label']").val('banner');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("[name='photoWidth']").val('1684');
			if( iframe === ".homeFeatureImage" ){
				$(iframe).contents().find("[name='photoHeight']").val('500');
			} else if( iframe === ".pageFeatureImage" ) {
				$(iframe).contents().find("[name='photoHeight']").val('200');
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.initAddOutput(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitleField : function(iframe, progress) {
			$(iframe).contents().find("[name='label']").val('Title');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addLink, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addLink : function(iframe, progress) {
			$(iframe).contents().find("[name='label']").val('Link');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.initAddOutput(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOutput : function(iframe, progress) {
			if(iframe === ".homeFeatureImage"){
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="homepageBanner"></div>';
			} else if( iframe === ".pageFeatureImage") {
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="pageBanner"></div>';
			} else if( iframe === ".socialIcons" ) {
				var text = '<a href="//Link//"><i class="icon-//Social Channel//"></i></a>';
			}
			$(iframe).contents().find("[name='output']").val(text);
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( iframe === ".socialIcons" ){
					autoContentGroupSetup.automation.completeMessage(iframe);
					$('.progress-bar').css('width', progress + '%');
					$('.progress-bar').text(progress + '%');
				}
			}, 3000);
		},
		completeMessage : function() {
			location.reload();
		}
	}
};
autoContentGroupSetup.init.elements();