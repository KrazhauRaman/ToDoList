const headers = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "accept": "application/json",
},
    apiUrl = "https://repetitora.net/api/JS/Tasks",
    mode = "cors";

//универсальный метод, который формирует запросы на сервер
function requestData(url, type, body) {
    return fetch(url,
        {
            method: type,
            body: body,
            headers: headers,
            mode: mode,
        })
        .then(result => result.json());
}

//отправка нового таска на сервер
export function createTask(title, widgetId) {

    let data = new URLSearchParams();
    data.append("widgetId", widgetId);
    data.append("title", title);

    return requestData(apiUrl, "POST", data);
}

//получение всех тасков с сервера
export function getTasks(widgetId) {
    return requestData(`${apiUrl}?widgetId=${widgetId}&page=1&count=999`, "GET", null);
}

//обновление таска (имя, is done)
export function updateTask(title = null, taskId, widgetId, isDone = null) {
    let data = new URLSearchParams();
    data.append("widgetId", widgetId);
    data.append("taskId", taskId);
    if (title != null) {
        data.append("title", title);
    }
    if (isDone != null) {
        data.append("done", isDone);
    }

    return requestData(apiUrl, "PUT", data);
}

//удаление таска
export function deleteTask(taskId, widgetId) {
    let data = new URLSearchParams();
    data.append("widgetId", widgetId);
    data.append("taskId", taskId);

    return requestData(apiUrl, "DELETE", data);
}