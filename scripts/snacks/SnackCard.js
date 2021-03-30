export const SnackCard = (snackObject) => {
	return `
	<div class="col">
		<div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top card-img-top-list"  aria-label="Placeholder:${snackObject.name}" 
            preserveAspectRatio="xMidYMid slice" focusable="false" src="${snackObject.snackImg}" alt="${snackObject.name}">
            <div class="card-body">
			<h5 color="primary">${snackObject.name}</h5>
              <p class="card-text">${snackObject.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="detailscake__${snackObject.id}">Details</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="deletecake__${snackObject.id}" disabled>Delete</button>
                </div>
                <small class="text-muted">Count: ${snackObject.count}</small>
              </div>
            </div>
    	</div>
	</div>
	`
}

export const SortCard = (snackObject) => {
	return `
	<div class="col">
		<div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top card-img-top-list"  aria-label="Placeholder:${snackObject.snack.name}" 
            preserveAspectRatio="xMidYMid slice" focusable="false" src="${snackObject.snack.snackImg}" alt="${snackObject.snack.name}">
            <div class="card-body">
			<h5 color="primary">${snackObject.snack.name}</h5>
              <p class="card-text">${snackObject.snack.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="detailscake__${snackObject.snack.id}">Details</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="deletecake__${snackObject.snack.id}" disabled>Delete</button>
                </div>
                <small class="text-muted">Count: ${snackObject.snack.count}</small>
              </div>
            </div>
    	</div>
	</div>
	`
}