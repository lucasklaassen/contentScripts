var autoContentGroupSetup = {
	init : {
		elements : function(){
			var homeFeatureImage = ".homeFeatureImage";
			$('html').prepend('<iframe class="homeFeatureImage"></iframe');
			var pageFeatureImage = ".pageFeatureImage";
			$('html').prepend('<iframe class="pageFeatureImage"></iframe');
			var socialIcons = ".socialIcons";
			$('html').prepend('<iframe class="socialIcons"></iframe');
			$('body').not('.homeFeatureImage, .pageFeatureImage').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Starting...</div></div>');
			$('.progress-bar').css('width', '10%');
			autoContentGroupSetup.automation.init(homeFeatureImage);
			autoContentGroupSetup.automation.init(pageFeatureImage);
			autoContentGroupSetup.automation.init(socialIcons);
		},
	},
	automation : {
		init : function(iframe) {
			$(iframe).attr("src", "/2014/settings/index.cfm?method=contentGroups.add");
			setTimeout(function() {
				autoContentGroupSetup.automation.addTitle(iframe);
				$('.progress-bar').css('width', '30%');
				$('.progress-bar').text("30% ");
			}, 1000);
		},
		addTitle : function(iframe) {
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
				autoContentGroupSetup.automation.initEditElements(iframe);
				$('.progress-bar').css('width', '40%');
				$('.progress-bar').text("40%");
			}, 1000);
		},
		initEditElements : function(iframe) {
			$(iframe).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				autoContentGroupSetup.automation.addPhoto(iframe);
				$('.progress-bar').css('width', '50%');
				$('.progress-bar').text("50%");
			}, 2000);
		},
		addPhoto : function(iframe) {
			if( iframe === ".homeFeatureImage" || iframe === ".pageFeatureImage" ) {
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
			} else if( iframe === ".socialIcons" ) {
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
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( iframe === ".socialIcons" ){
					autoContentGroupSetup.automation.initAddTitleField(iframe);
				} else if( iframe === ".homeFeatureImage" || iframe === ".pageFeatureImage" ){
					autoContentGroupSetup.automation.initAddOutput(iframe);
				}
				$('.progress-bar').css('width', '70%');
				$('.progress-bar').text("70%");
			}, 3000);
		},
		initAddTitleField : function(iframe) {
			$(iframe).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				autoContentGroupSetup.automation.addTitleField(iframe);
			}, 2000);
		},
		addTitleField : function(iframe) {
			$(iframe).contents().find("[name='label']").val('Title');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.initAddLink(iframe);
			}, 3000);
		},
		initAddLink : function(iframe) {
			$(iframe).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				autoContentGroupSetup.automation.addLink(iframe);
			}, 2000);
		},
		addLink : function(iframe) {
			$(iframe).contents().find("[name='label']").val('Link');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.initAddOutput(iframe);
			}, 3000);
		},
		initAddOutput : function(iframe) {
			$(iframe).contents().find('.v65-view-group:eq(2)').find('.btn').trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.addOutput(iframe);
				$('.progress-bar').css('width', '80%');
				$('.progress-bar').text("80% Time Remaining: 10 seconds...");
			}, 3000);
		},
		addOutput : function(iframe) {
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
					$('.progress-bar').css('width', '90%');
					$('.progress-bar').text("90%");
				}
			}, 3000);
		},
		completeMessage : function() {
			location.reload();
		}
	}
};
autoContentGroupSetup.init.elements();