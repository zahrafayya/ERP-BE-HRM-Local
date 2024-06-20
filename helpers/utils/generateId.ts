export const generateId = () => {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const randomDigits = String(Math.floor(100 + Math.random() * 900)); // 3 random digits
    return `${year}${month}${day}${hours}${minutes}${randomDigits}`;
}

export const generateRecruitmentRequestId = () => {
    return 'RQ' + generateId();
}

export const generateDepartmentId = () => {
    return 'DP' + generateId();
}

export const generatePositionId = () => {
    return 'PS' + generateId();
}

export const generateEmployeeId = () => {
    return 'EM' + generateId();
}

export const generateSalarySlipId = () => {
    return 'SL' + generateId();
}

export const generateBukpotId = () => {
    return 'BP' + generateId();
}

export const generateBukpotBlueId = () => {
    return 'BL' + generateId();
}

export const generatePresenceBlueId = () => {
    return 'PB' + generateId();
}

export const generatePresenceWhiteId = () => {
    return 'PW' + generateId();
}

export const generateScheduleId = () => {
    return 'SC' + generateId();
}

export const generateAsuransiId = () => {
    return 'AS' + generateId();
}

export const generateAmalId = () => {
    return 'AM' + generateId();
}

export const generateFamilyMemberId = () => {
    return 'FM' + generateId();
}