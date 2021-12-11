exports.validate = (teamName, scrum_master, member_names) => {
    valid = true
    if (teamName == ''|| scrum_master.includes('@lewisu.edu') == false) {
        valid = false
    }
    for (i=0;i<member_names.length;i++)
    {
        if (member_names[i].includes('@lewisu.edu') == false) {
            valid = false
        }
    }
    return valid
}