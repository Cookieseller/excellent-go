export default class Room {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    rename(name) {
        this.name = name;
    }
    
    addMember(member) {
        this.members.push(member);
    }
    
    removeMember(member) {
        this.members.remove(member);
    }
    
    getMembers() {
        return this.members;
    }
}
