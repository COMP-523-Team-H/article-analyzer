const hostname = "http://localhost:8080";
const fetch = require("node-fetch");


describe('insert three annotations after creating workspace under the same name', () => {
    var path = hostname+"/api/create";
	var body = {
		original_url: "http://www.google.com",
		date:"just now"
	}
	const annotationTime = "now";
	const name = 'Yu Ji';
	const content1 = "annotation 1";
	const content2 = "annotation 2";
	const content3 = "annotation 3";
	var id = "";
	it('create a workspace and insert three annotations under Yu Ji', () => {
		return fetch(path, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(res=>res.json())
		.then(json=>{
			id = json.id;
			var obj = {};
			obj.original_url = json.original_url;
			obj.date = json.date;
			expect(obj).toEqual(body);
		})
		.then(()=>{
			path = hostname+'/api/annotation/insert';
			var annotation = {
				workspace: id,
				id:1,
				name: name,
				date: annotationTime,
				content: content1
			}
			return fetch(path, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(annotation)
			}).then(res=>res.json())
			.then(json=>{
				const result = {message: "annotation saved successfully"};
				expect(json).toEqual(result);
			})
		})
		.then(()=>{
			path = hostname+'/api/annotation/insert';
			var annotation = {
				workspace: id,
				id: 2,
				name: name,
				date: annotationTime,
				content: content2
			}
			return fetch(path, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(annotation)
			}).then(res=>res.json())
			.then(json=>{
				const result = {message: "annotation saved successfully"};
				expect(json).toEqual(result);
			})
		})
		.then(()=>{
			path = hostname+'/api/annotation/insert';
			var annotation = {
				workspace: id,
				id: 3,
				name: name,
				date: annotationTime,
				content: content3
			}
			return fetch(path, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(annotation)
			}).then(res=>res.json())
			.then(json=>{
				const result = {message: "annotation saved successfully"};
				expect(json).toEqual(result);
			})
		})
		.then(()=>{
			path = hostname+'/api/annotation/all/'+id;
			return fetch(path, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(res=>res.json())
			.then(json=>{
				var annotations = json.annotations;
				expect(annotations[0].name).toEqual(name);
				expect(annotations[1].name).toEqual(name);
				expect(annotations[2].name).toEqual(name);
				expect(annotations[0].content).toEqual(content1);
				expect(annotations[1].content).toEqual(content2);
				expect(annotations[2].content).toEqual(content3);
				expect(annotations[0].date).toEqual(annotationTime);
				expect(annotations[1].date).toEqual(annotationTime);
				expect(annotations[2].date).toEqual(annotationTime);
			})
		})
		.then(()=>{
			path = hostname+'/api/collaborators/'+id;
			return fetch(path, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(res=>res.json())
			.then(json=>{
				expect(json).toEqual({"Yu Ji": 3});
			})
		})
	})
})




describe('collaborator', () => {
    var path = hostname+"/api/create";
	var body = {
		original_url: "http://www.google.com",
		date:"just now"
	}
	
	var id = "";
	it('create a workspace try to get collab list, should be empty', () => {
		return fetch(path, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(res=>res.json())
		.then(json=>{
			id = json.id
			var obj = {};
			obj.original_url = json.original_url;
			obj.date = json.date;
			expect(obj).toEqual(body);
		})
		.catch((err)=>{
			console.log(err);
		})
		.then(()=>{
			path = hostname+'/api/collaborators/' + id;
			return fetch(path, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(res=>res.json())
			.then(json=>{
				expect(json).toEqual({});
			})
		})
		
	})		
})