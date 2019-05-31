import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
    return request(`/api/v1/permission/page?${stringify(params)}`);
}

export async function queryById(params) {
    return request('/api/v1/permission/get/' + params);
}

export async function deleteById(params) {
    return request('/api/v1/permission/delete/' + params, {
        method: 'DELETE',
    });
}

export async function addPermission(params) {
    return request('/api/v1/permission/add', {
        method: 'POST',
        data: {
            ...params,
        },
    });
}

export async function updatePermission(params) {
    return request('/api/v1/permission/update', {
        method: 'PUT',
        data: {
            ...params,
        },
    });
}
