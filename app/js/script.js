/**
 * Created by Ben on 29.05.2016.
 */
// immediately invoked, $ locally scoped
(function ($, window, document) {
    "use strict";

    // DOM ready
    $(document).ready(function () {

        if (typeof(Storage) === "undefined") {
            alert("Dieser Browser unterstützt keinen LocalStorage. Daten können nicht gespeichert werden.");
        }

        var $doneArea = $('#done-area');
        var $currentArea = $('#current-area');
        var $newTaskInput =  $('#newTask-input');

        var taskID = 0;
        var tasks = {};

        // initialize the tasks array
        (function loadTasks(){
            var key;
            tasks = JSON.parse(localStorage.getItem("todo"));

            for (key in tasks) {
                if (tasks.hasOwnProperty(key)) {
                    addField(tasks[key]);

                    if(key > taskID){ // set ID
                        taskID = key;
                    }
                }
            }
        }());

        /** View **/
        // add field to section
        function addField(taskObj){
            var $area, btnClass, btnIcon, disabled;

            if (taskObj.status === "current") {
                $area = $currentArea;
                btnClass = 'btn-success';
                btnIcon = 'glyphicon-ok';
                disabled = '';
            } else {
                $area = $doneArea;
                btnClass = 'btn-warning';
                btnIcon = 'glyphicon-remove';
                disabled = 'disabled';
            }

            var field =  '<div class="input-group" id="task-'+ taskObj.id +'">' +
                            '<input class="form-control" type="text" value="' + taskObj.text + '" ' + disabled + '>' +
                            '<span class="input-group-btn">' +
                                '<button class="btn ' + btnClass + '" data-id="' + taskObj.id + '">' +
                                    '<i class="glyphicon ' + btnIcon + '"></i>' +
                                '</button>' +
                        '</span></div>';

            $area.append(field);
        }

        // remove field from section
        function removeField(id){
            $('#task-' + id).remove();
        }


        /** Controler **/
        // save new task to storage
        function newTask(text){
            if (text.length < 3) {
                return;
            }

            taskID++;
            tasks[taskID] = {
                id : taskID,
                status: "current",
                text: text
            };

            // Saving element in local storage
            localStorage.setItem("todo", JSON.stringify(tasks));

            addField(tasks[taskID]);

            // clear input field
            $newTaskInput.val('');
        }

        // push current tasks to done
        function setDone(id){
            tasks[id].status = "done";
            localStorage.setItem("todo", JSON.stringify(tasks));

            removeField(id);
            addField(tasks[id]);
        }

        // push current tasks to done
        function deleteTask(id){
            console.log("delete " + id);

            console.log(tasks);

            delete tasks[id];

            console.log(tasks);

            localStorage.setItem("todo", JSON.stringify(tasks));

            removeField(id);
        }

        function updateTask(id){
            console.log("update " +  id);

//TODO
        }


        /** Events **/
        // Save new task on enter or click
        $newTaskInput.on('keypress',function (e) {
            e.preventDefault;

            if (e.which === 13) { // Enter
                newTask($(this).val());
            }
        });
        $('#newTask-btn').on('click', function () {
                newTask($newTaskInput.val());
            }
        );

        // Edit tasks
        $currentArea.on('focusout', 'input', function () {
                updateTask($(this).data('id'));
            }
        );

        // Mark task as done
        $currentArea.on('click', 'button', function () {
                setDone($(this).data('id'));
            }
        );

        // Delete task
        $doneArea.on('click', 'button', function () {
                deleteTask($(this).data('id'));
            }
        );



    });

}(window.jQuery, window, document));