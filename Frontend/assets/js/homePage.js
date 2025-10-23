function showContent(event, id) {
    event.preventDefault();
    const boxs = document.querySelectorAll('.box-content');
    boxs.forEach(box => {
        box.style.display = "none";
    })

    document.getElementById(id).style.display ="block";

    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));

    event.target.closest("li").classList.add("active");
}