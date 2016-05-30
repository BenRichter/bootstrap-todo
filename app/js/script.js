/**
 * Created by Ben on 29.05.2016.
 */
// immediately invoked, $ locally scoped
(function ($, window, document) {
    "use strict";  // for dev: throw more errors > fail fast, fail loudly

    // DOM ready
    $(document).ready(function () {
        // Initial loading of tasks
        var i;

        for (i = 0; i < localStorage.length; i++){
            $("#tasks").append("<li id='task-" + i + "'>" + localStorage.getItem('task-' + i) + " <a href='#'>Delete</a></li>");
        }

        // Add a task
        $("#tasks-form").submit(function () {
            if ($("#task").val() !== "") {
                localStorage.setItem("task-" + i, $("#task").val());

                $("#tasks").append("<li id='task-" + i + "'>" + localStorage.getItem("task-" + i) +" <a href='#'>Delete</a></li>");
                $("#task").val("");
                i++;
            }
            return false;
        });


        // Remove a task
        $("#tasks li a").on("click", function () {
            localStorage.removeItem($(this).parent().attr("id"));
            $(this).parent().hide();
            for (i = 0; i < localStorage.length; i++) {
                if (!localStorage.getItem("task-" + i)) {
                    localStorage.setItem("task-" + i, localStorage.getItem('task-' + (i + 1)));
                    localStorage.removeItem('task-' + (i + 1));
                }
            }
        });
    });

}(window.jQuery, window, document));