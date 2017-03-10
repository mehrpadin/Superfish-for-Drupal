/*
 * sf-AutomaticWidth v1.0b - Automatically adjusts the menu width for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.sfautomaticwidth = function(){
    function automaticWidth(menu){
      // This plugin is not useful for vertical menus.
      if (menu.hasClass('sf-horizontal') || menu.hasClass('sf-navbar')){
        // Adding a helper class.
        // Making the main UL as wide as its container.
        menu.addClass('sf-automatic-width').css('width','100%');
        var
        // We need the inner width of the main UL.
        menuWidth = menu[0].clientWidth,
        // Selecting only the first level parents.
        children = menu.children('li'),
        // Number of children.
        childrenNumber = children.length,
        // Calculating the total width of the children based on their outer width.
        childrenWidth = 0;
        for (var a = 0; a < childrenNumber; a++) {
          // Resetting the children width and getting its outer width then.
          childrenWidth += children.eq(a).css({width:''}).outerWidth(true);
        }
        // Is the menu container wider than the menu?
        // (It'll be more flexible in later versions.)
        if (menuWidth > childrenWidth) {
          var
          // Calculating how much width should be added to each first level parent.
          difference = (((menuWidth - childrenWidth) * 100) / menuWidth) / childrenNumber;
          for (var a = 0; a < childrenNumber; a++){
            var
            child = children.eq(a),
            // Calculating and applying the new width to the item.
            autoWidth = (((child[0].clientWidth * 99.8) / menuWidth) + difference) + '%';
            child.css({width:autoWidth});
          }
        }
        // Reset the widths if the menu became narrower than its children.
        if (menuWidth < childrenWidth) {
          for (var a = 0; a < childrenNumber; a++){
            children.eq(a).css({width:''});
          }
        }
      }
    }
    // Return original object to support chaining.
    // Although unnecessary because of the way the module uses these plugins.
    for (var b = 0; b < this.length; b++) {
      var menu = $(this).eq(b);
      automaticWidth(menu);
      var timer;
      $(window).resize(function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
          automaticWidth(menu);
        }, 100);
      });
    }
    return this;
  };
})(jQuery);
